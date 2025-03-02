import { Hono } from 'hono'
import { html } from 'hono/html';

const app = new Hono()

const listTask = [];

app.get('/', (context) => {
  return context.html(html`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Biolab Design</title>
        <link rel="stylesheet" href="styles.css">
    </head>
    <style>
        /* styles.css */
        body {
            font-family: sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background: #f8f8f8;
            overflow: hidden;
            text-align: center;
            position: relative;
        }
        /* Fondo con efecto borroso */
        .background {
            position: absolute;
            width: 80vw;
            height: 80vh;
            top: 10%;
            left: 10%;
            background: radial-gradient(circle at 50% 50%, rgba(0, 150, 255, 0.3), rgba(255, 100, 200, 0.4), rgba(255, 255, 255, 0));
            filter: blur(80px);
            border-radius: 50%;
            z-index: -1;
        }
    
        main {
            width: 60%;
        }
        span {
            font-size: 28px;
            font-weight: bold;
        }
        h1 {
            font-size: 68px;
            font-weight: bold;
            margin-bottom: 15px;
        }
        .cta {
            text-decoration: none;
            font-weight: bold;
            color: black;
            padding: 10px 15px;
            border-radius: 5px;
            transition: 0.3s;
        }
        .cta:hover {
            text-decoration: underline;
        }
    </style>
    <body>
        <div class="background"></div>
        <main>
            <h1>LIST DOC<span>.v1</span></h1>
            <a href="/docs" class="cta">Ver Documentación →</a>
        </main>
    </body>
    </html>`);
})

// CREATE 
app.post('/api/createBuys', async(context) => {
  const { nombre, descripcion, fecha, esCompletado } = await context.req.json();
  const myObject = {
    id: listTask.length + 1,
    nombre,
    descripcion,
    fecha,
    esCompletado
  }

  listTask.push(myObject);

  return context.json({ message: 'Tarea creada con éxito', data: myObject });
})

// READ 
app.get('/api/getBuys', (context) => {
  console.table(listTask)
  return context.json({ message: 'Tarea creada con éxito', data: listTask });
})

// READ BY ID
app.get('/api/getBuys/:id', (context) => {
  const id  = context.req.param('id');
  const myobj = listTask.find((item, index) => item.id === parseInt(id))

  return context.json({ message: 'Tarea creada con éxito', data: myobj  });
})

// READ BY ID
app.put('/api/updateBuy/:id', async(context) => {
  const id  = context.req.param('id');
  const { nombre, descripcion, fecha, esCompletado } = await context.req.json();

  const myobj = listTask.find((item, index) => item.id === parseInt(id))

  console.log(myobj)
  myobj.nombre = nombre;
  myobj.descripcion = descripcion;
  myobj.fecha = fecha;    

  return context.json({ message: 'Tarea creada con éxito', data: myobj  });
})

// READ BY ID
app.delete('/api/deleteBuy/:id', (context) => {
  const id  = context.req.param('id');
  const indice = listTask.findIndex((item, index) => item.id === parseInt(id))
  listTask.splice(indice, 1)

  return context.json({ message: 'Tarea eliminada con éxito', data: listTask });
})

app.put('/api/setCompleted/:id', (context) => {
  const id  = context.req.param('id');
  let myobj = listTask.filter(item => item.id === parseInt(id))

  myobj[0].esCompletado = true;

  return context.json({ message: 'La tarea fue marcada como completado existosamente', data: myobj});
})

app.get('/api/pendientes', (context) => {
  return context.json({ message: 'Lista de tareas pendientes', data: listTask.filter(item => item.esCompletado === false) });
})

app.get('/api/completados', (context) => {
  return context.json({ message: 'Lista de tareas completadas', data: listTask.filter(item => item.esCompletado === true) });
})
export default app
