import Sequelize from "sequelize";
import createProjectEntity from "./project.mjs";
import createTaskEntity from "./task.mjs";
import createUserEntity from "./user.mjs";
import createPermissionEntity from "./permission.mjs";
import createCommentEntity from "./comment.mjs";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db.sqlite",
  logQueryParameters: true,
});

const Project = createProjectEntity(sequelize, Sequelize);
const Task = createTaskEntity(sequelize, Sequelize);
const User = createUserEntity(sequelize, Sequelize);
const Permission = createPermissionEntity(sequelize, Sequelize);
const Comment = createCommentEntity(sequelize, Sequelize);

User.hasMany(Project);
Project.belongsTo(User);

Project.hasMany(Task);
Task.belongsTo(Project);

Project.hasOne(Permission, { foreignKey: "forResource", constraints: false });
Task.hasOne(Permission, { foreignKey: "forResource", constraints: false });

Task.belongsTo(User, { as: "assignedTo" });
User.hasOne(Task);

Task.hasMany(Comment, { foreignKey: "taskId", onDelete: "CASCADE" });
Comment.belongsTo(Task, { foreignKey: "taskId" });

User.hasMany(Comment, { foreignKey: "userId", onDelete: "CASCADE" });
Comment.belongsTo(User, { foreignKey: "userId" });

try {
  await sequelize.sync({
    // alter: false,
    // force: true,
  });
} catch (err) {
  console.warn(err);
}

export default {
  sequelize,
  Permission,
  Project,
  Task,
  User,
  Comment,
};
