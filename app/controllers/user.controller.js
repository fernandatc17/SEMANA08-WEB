// Controlador que responde a rutas públicas (accesibles sin autenticación)
export const allAccess = (req, res) => {
    res.status(200).send("Public Content."); // Responde con contenido público
};

// Controlador que responde a rutas accesibles solo para usuarios autenticados
export const userBoard = (req, res) => {
    res.status(200).send("User Content."); // Responde con contenido para usuarios comunes
};

// Controlador que responde a rutas exclusivas para administradores
export const adminBoard = (req, res) => {
    res.status(200).send("Admin Content."); // Responde con contenido para admins
};

// Controlador que responde a rutas exclusivas para moderadores
export const moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content."); // Responde con contenido para moderadores
};

import db from "../models/index.js";

const { user: User, role: Role } = db;

// Lista todos los usuarios con sus roles
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: {
        model: Role,
        as: "roles",
        attributes: ["name"],
        through: { attributes: [] },
      },
    });

    const userData = users.map((u) => ({
      id: u.id,
      username: u.username,
      email: u.email,
      roles: u.roles.map((r) => r.name),
    }));

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Cambiar el rol de un usuario (solo 1 rol a la vez)
export const updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const roleObj = await Role.findOne({ where: { name: role } });
    if (!roleObj) return res.status(400).json({ message: "Rol inválido" });

    await user.setRoles([roleObj]);
    res.json({ message: "Rol actualizado correctamente" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

