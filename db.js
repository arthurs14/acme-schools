const Sequelize = require('sequelize');
const { STRING, UUID, UUIDV4, DECIMAL } = Sequelize;

const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_schools');

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
    validate: {
      isEmail: true
    }
  },
  GPA: {
    type: DECIMAL,
    validate: {
      isDecimal: true
    }
  }
});

const syncAndSeed = async () => {
  await conn.sync({ force: true });
};

syncAndSeed();
