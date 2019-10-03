const Sequelize = require('sequelize');
const { STRING, UUID, UUIDV4, DECIMAL } = Sequelize;

const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_schools', { logging: false });


// Models
const School = conn.define('school', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    allowNull: false
  },
  imageURL: {
    type: STRING,
    allowNull: false,
    validate: {
      isUrl: true
    }
  }
});

const Student = conn.define('student', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  firstName: {
    type: STRING,
    allowNull: false
  },
  lastName: {
    type: STRING,
    allowNull: false
  },
  email: {
    type: STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  GPA: {
    type: DECIMAL,
    allowNull: false,
    validate: {
      isDecimal: true
    }
  }
});

// Associations
School.hasMany(Student);

const mapAndSave = async (model, items) => Promise.all(await items.map( item => model.create(item)));

const syncAndSeed = async () => {
  await conn.sync({ force: true });

  const schools = [
    { name: 'Stanford University', imageURL: 'https://www.google.com' },
    { name: 'California Institute of Technology', imageURL: 'https://www.google.com' },
    { name: 'University of California, Los Angeles', imageURL: 'https://www.google.com' },
    { name: 'University of California, Berkeley', imageURL: 'https://www.google.com' },
    { name: 'University of California, Irvine', imageURL: 'https://www.google.com' }
  ];

  const [ SU, CIT, UCLA, UCB, UCI ] = await mapAndSave(School, schools);

  const students = [
    { firstName: 'Tim', lastName: 'Smith', email: 'tim@gmail.com', GPA: 3.0, schoolId: SU.id },
    { firstName: 'Jim', lastName: 'Marshall', email: 'jim@gmail.com', GPA: 3.10, schoolId: CIT.id },
    { firstName: 'David', lastName: 'Quach', email: 'david@gmail.com', GPA: 3.25, schoolId: UCLA.id },
    { firstName: 'Robert', lastName: 'Chen', email: 'robert@gmail.com', GPA: 3.5, schoolId: UCB.id },
    { firstName: 'Tommy', lastName: 'Nguyen', email: 'tommy@gmail.com', GPA: 3.8, schoolId: UCI.id }
  ];

  await mapAndSave(Student, students);

};

module.exports = {
  syncAndSeed,
  models: {
    School,
    Student
  }
};
