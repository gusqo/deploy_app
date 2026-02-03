// const { response } = require('express');
const database = require('../database/database');

exports.updateCompletedTask = async (request, response) => {
  const { isCompleted, itemId } = request.body;

  console.log(isCompleted, itemId);

  try {
    await database.pool.query(
      'UPDATE tasks SET iscompleted = $1 WHERE _id = $2',
      [isCompleted, itemId]
    );
    return response.status(200).json({ msg: 'Task Updated Successfully' });
  } catch (error) {
    return response
      .status(500)
      .json({ msg: 'Update Completed Failed', error: error.message });
  }
};

exports.updateTask = async (request, response) => {
  const { title, description, date, isCompleted, isImportant, _id } =
    request.body;
  try {
    await database.pool.query(
      'UPDATE tasks SET title=$1, description=$2, date=$3, iscompleted=$4, isimportant=$5 WHERE _id=$6',

      [title, description, date, isCompleted, isImportant, _id]
    );
    return response.status(200).json({ msg: 'Task Updated Successfully' });
  } catch (error) {
    return response
      .status(500)
      .json({ msg: 'Update Task Fail', error: error.message });
  }
};
