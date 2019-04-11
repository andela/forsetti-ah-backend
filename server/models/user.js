import bcrypt from 'bcrypt';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      allowNull: false
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    roleId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: 'd002d107-bb04-4846-9313-01a45f26306a'
    },
    social: {
      type: DataTypes.STRING,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    istokenreset: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    subscribed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {});
  User.associate = (models) => {
    User.hasMany(models.Comment, {
      foreignKey: 'userId',
      as: 'usercomments'
    });
    User.hasMany(models.DraftComment, {
      foreignKey: 'userId',
      as: 'userdraftcomments'
    });
    User.hasMany(models.Article, {
      foreignKey: 'userId',
      as: 'articles'
    });
    // Followers table
    User.belongsToMany(models.User, {
      foreignKey: 'followee',
      otherKey: 'follower',
      through: 'Followers',
      as: 'followers',
      timestamps: false,
    });
    User.belongsToMany(models.User, {
      foreignKey: 'follower',
      otherKey: 'followee',
      through: 'Followers',
      as: 'following',
      timestamps: false,
    });
    User.hasMany(models.Report, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  User.prototype.isPasswordValid = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  return User;
};
