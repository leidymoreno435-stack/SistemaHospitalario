export async function crearUsuariosDemo(hasher) {
  const adminHash = await hasher.hash("Admin1234!");
  const invitadoHash = await hasher.hash("Invitado123!");

  return [
    {
      id: "1",
      nombre: "admin",
      contrasenaHash: adminHash,
      rol: "admin",
      activo: true,
    },
    {
      id: "2",
      nombre: "invitado",
      contrasenaHash: invitadoHash,
      rol: "usuario",
      activo: true,
    },
  ];
}
