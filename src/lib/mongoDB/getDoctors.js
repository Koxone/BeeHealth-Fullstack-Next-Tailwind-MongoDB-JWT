export async function fetchDoctors() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/doctors`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Error al obtener lista de pacientes');
  const data = await res.json();
  return data.users;
}
