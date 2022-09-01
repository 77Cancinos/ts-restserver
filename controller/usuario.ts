import { Request, Response } from "express";
import Usuario from "../models/usuario";

export const getUsuarios = async (req: Request, res: Response) => {
  const usuarios = await Usuario.findAll();

  res.json({
    msg: "getUsuarios",
    usuarios,
  });
};

export const getUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await Usuario.findByPk(id);

  //Validamos si no existe el registro con dicho ID
  if (user) {
    res.json({
      msg: "getUsuario",
      id,
      user,
    });
  } else {
    res.status(404).json({
      msg: `No existe el usuario con el id ${id} en la base de datos`,
    });
  }
};

export const postUsuario = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    //Verificamos antes de insertar si ya existe un usuario con dicho email
    const emailExiste = await Usuario.findOne({
      where: {
        email: body.email,
      },
    });
    //Si ya existe un usuario con el mismo correo manda el mensaje msg
    if (emailExiste) {
      return res.status(400).json({
        msg: "Ya existe un usuario con el Email: " + body.email,
      });
    }

    //Lo que mandamos en el body lo asignamos a la DB
    const user = await Usuario.create(body);

    res.json({
      msg: "postUsuario",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el admin",
    });
  }
};

export const putUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    //Verificamos si el usuario existe
    const user = await Usuario.findByPk(id);
    if (!user) {
      return res.status(404).json({
        msg: "No existe un usuario con el id " + id,
      });
    }

    //Verificamos antes de insertar si ya existe un usuario con dicho email
    const emailExiste = await Usuario.findOne({
      where: {
        email: body.email,
      },
    });
    //Si ya existe un usuario con el mismo correo manda el mensaje msg
    if (emailExiste) {
      return res.status(400).json({
        msg: "Ya existe un usuario con el Email: " + body.email,
      });
    }

    await user.update(body);

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el admin",
    });
  }

  res.json({
    msg: "putUsuario",
    id,
    body,
  });
};

export const deleteUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;

  //Verificamos si el usuario existe
  const user = await Usuario.findByPk(id);
  if (!user) {
    return res.status(404).json({
      msg: "No existe un usuario con el id " + id,
    });
  }

// 1. Eliminación fisica (Borrar el registro directamente de la DB)
    //await user.destroy();

// 2. Eliminación lógica (Cambiar el estado del usuario, deshabilitado)
    await user.update({ estado: false});

  res.json({
    msg: "El usuario con el id " + id + " fue eliminado con exito"
  });


  
};
