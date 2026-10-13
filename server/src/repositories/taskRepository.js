import connection from "./connection.js"

export async function getTasksDB() {
  const connectInstance = connection
  const tasks = await connectInstance.query("SELECT * FROM task ORDER BY position, id");
  return tasks.rows
}

export async function createTaskDB(position) {
  const connectInstance = connection
  const result = await connectInstance.query(
    "INSERT INTO task (content, checked, position, userId) VALUES ($1, $2, $3, $4) RETURNING *",
    ["", false, position, "Pedro@gmail.com"]
  );

  return result.rows[0];
}

export async function updateTaskDB(id, content, checked) {

  const connectInstance = connection
  const result = await connectInstance.query(
    `UPDATE task SET content=$1, checked=$2 WHERE id=$3 RETURNING *`,
    [content, checked, id])
  return result.rows[0] ?? null;
}

export async function deleteTaskDB(id) {
  const connectInstance = connection
  const result = await connectInstance.query(
    `DELETE FROM task WHERE id=$1`,
    [id])
  if (result.rowCount === 0) return false;

  await connectInstance.query(`
    WITH ordered_tasks AS (
      SELECT id, ROW_NUMBER() OVER (ORDER BY position, id) AS new_position
      FROM task
    )
    UPDATE task
    SET position = ordered_tasks.new_position
    FROM ordered_tasks
    WHERE task.id = ordered_tasks.id
  `);

  return true;
}