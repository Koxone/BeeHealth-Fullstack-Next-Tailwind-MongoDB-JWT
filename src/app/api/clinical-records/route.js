import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import ClinicalRecord from '@/models/ClinicalRecord';

// @route    POST /api/clinical-records
// @desc     Create Clinical Record
// @access   Private
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    // Basic Validation
    const { patient, doctor, specialty, version, answers } = body;
    if (!patient || !specialty || !version || !answers) {
      return NextResponse.json({ error: 'Campos requeridos faltantes' }, { status: 400 });
    }

    const record = await ClinicalRecord.create({
      patient,
      doctor,
      specialty,
      version,
      answers,
    });

    return NextResponse.json(record, { status: 201 });
  } catch (err) {
    console.error('Error al guardar el historial clínico:', err);
    return NextResponse.json({ error: 'Error al guardar el historial clínico' }, { status: 500 });
  }
}
