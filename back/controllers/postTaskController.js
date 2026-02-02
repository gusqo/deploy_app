const database = require('../database/database');
const { v4: uuidv4 } = require('uuid');

exports.postTask = async (request, response) => {
  const _id = uuidv4();
  const { title, description, date, isCompleted, isImportant, userId } =
    request.body;

  console.log('=== POST 요청 받음 ===');
  console.log('생성된 ID:', _id);
  console.log('받은 데이터:', {
    title,
    description,
    date,
    isCompleted,
    isImportant,
    userId,
  });

  try {
    const result = await database.pool.query(
      'INSERT INTO tasks (_id, title, description, date, isCompleted, isImportant, userId) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [_id, title, description, date, isCompleted, isImportant, userId]
    );
    console.log('✅ DB 저장 성공!');
    console.log('저장된 데이터:', result.rows[0]);
    return response
      .status(200)
      .json({ msg: 'Task created successfully', data: result.rows[0] });
  } catch (error) {
    console.error('❌ DB 저장 실패:', error.message);
    console.error('전체 에러:', error);
    return response.status(500).json({ msg: `Post task Error: ${error}` });
  }
};
