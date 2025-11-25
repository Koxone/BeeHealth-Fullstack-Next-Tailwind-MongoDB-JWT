import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { getAuthUser } from '@/lib/auth/getAuthUser';

// Models
import Consultation from '@/models/Consult';
import Inventory from '@/models/Inventory';
import Transaction from '@/models/Transaction';
import Product from '@/models/Product';
import User from '@/models/User';
import Diet from '@/models/Diet';
import Workout from '@/models/Workout';

// @route    POST /api/workouts/create
// @desc     Create a new workout
// @access   Private
export async function POST(req) {
  try {
    // Connect to database
    await connectDB();

    // Authenticate user
    const authUser = await getAuthUser(req);
    if (!authUser) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: 'UNAUTHORIZED',
            message: 'User is not authenticated',
            reason: 'The request did not include valid authentication credentials',
          },
        },
        { status: 401 }
      );
    }

    const { userId } = authUser;

    // Parse request body
    const {
      patients,
      name,
      type,
      difficulty,
      duration,
      about,
      instructions,
      benefits,
      cautions,
      images,
      video,
    } = await req.json();

    // Validate required fields
    if (
      !name ||
      !type ||
      !difficulty ||
      !duration ||
      !about ||
      !instructions?.length ||
      !benefits?.length ||
      !cautions?.length ||
      !images?.length ||
      !video
    ) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: 'MISSING_FIELDS',
            message: 'Required fields are missing',
            reason: 'The request did not include all required fields for creating a workout',
          },
        },
        { status: 400 }
      );
    }

    // Create new workout
    const newWorkout = await Workout.create({
      patients:
        patients?.map((id) => ({
          patient: new mongoose.Types.ObjectId(id),
          isActive: true,
          assignedAt: new Date(),
        })) || [],
      name,
      type,
      difficulty,
      duration,
      about,
      instructions,
      benefits,
      cautions,
      images,
      video,
    });

    return NextResponse.json(
      {
        ok: true,
        data: newWorkout,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating workout:', error);
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: 'SERVER_ERROR',
          message: 'An error occurred while creating the workout',
          reason: 'Please try again later or contact support if the issue persists',
        },
      },
      { status: 500 }
    );
  }
}
