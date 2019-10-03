const Sequelize = require('sequelize');
const { STRING, UUID, UUIDV4, DECIMAL } = Sequelize;

const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_schools');


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
// School.hasMany(Student);

const mapAndSave = async (model, items) => Promise.all(items.map( item => model.create(item)));

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


};

syncAndSeed();
