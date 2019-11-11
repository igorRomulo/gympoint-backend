import * as Yup from 'yup';

import Student from '../models/Students';

class StudentsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number().integer(),
      weight: Yup.string().required(),
      height: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExists) {
      return res.status(400).json({ error: 'Student already exist' });
    }

    const { name, email, age, weight, height } = await Student.create(req.body);

    return res.json({
      name,
      email,
      age,
      weight,
      height,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email(),
      age: Yup.number().integer(),
      weight: Yup.string(),
      height: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email } = req.body;

    const studentExists = await Student.findOne({
      where: { email },
    });

    const { age, weight, height } = await studentExists.update(req.body);

    return res.json({
      email,
      age,
      weight,
      height,
    });
  }
}

export default new StudentsController();
