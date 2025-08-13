// netlify/functions/addTodoistTask.js
export async function handler(event) {
    try {
      if (event.httpMethod !== "POST") {
        return {
          statusCode: 405,
          body: JSON.stringify({ error: "Method Not Allowed" })
        };
      }
  
      const token = process.env.TODOIST_TOKEN; // From Netlify env vars
      const { content, due_string, priority } = JSON.parse(event.body);
  
      const res = await fetch("https://api.todoist.com/rest/v2/tasks", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ content, due_string, priority })
      });
  
      const data = await res.json();
  
      return {
        statusCode: res.status,
        body: JSON.stringify(data)
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: err.message })
      };
    }
  }
  