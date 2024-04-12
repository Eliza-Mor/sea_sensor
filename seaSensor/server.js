const aedes = require('aedes')();
const httpServer = require('http').createServer();
const ws = require('websocket-stream');
const MongoClient = require('mongodb').MongoClient;

const mongoURL = 'mongodb+srv://admin:2822004@ioty.ikxu0cy.mongodb.net/';
const dbName = 'iot';
const collectionName = 'sensores';

ws.createServer({ server: httpServer }, aedes.handle);

httpServer.listen(9001, function () {
  console.log('Servidor WebSocket escuchando en el puerto 9001');
});

server.listen(8888, function () {
  console.log('Servidor MQTT escuchando en el puerto 8888');
});

// Manejar eventos del servidor MQTT
aedes.on('client', function (client) {
  console.log('Cliente MQTT conectado:', client.id);
});

aedes.on('clientDisconnect', function (client) {
  console.log('Cliente MQTT desconectado:', client.id);
});

// Manejar eventos de publicación MQTT
aedes.on('publish', function (packet, client) {
  if (client) {
    console.log('Publicación recibida de cliente', client.id, ':', packet.payload.toString());
    const data = packet.payload.toString().split(','); // Separar los datos de temperatura y pH
    const clientId = client.id; // Obtener el ID del cliente MQTT
    updateDataInMongoDB(clientId, parseFloat(data[0]), parseFloat(data[1])); // Actualizar los datos en MongoDB
  }
});

// Función para actualizar datos en MongoDB
async function updateDataInMongoDB(clientId, temperature, pH) {
  try {
    const client = await MongoClient.connect(mongoURL);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.updateOne(
      { clientId: clientId }, // Buscar el documento por clientId
      { $set: { temperature: temperature, pH: pH } }, // Actualizar los campos temperature y pH
      { upsert: true } // Insertar un nuevo documento si no se encuentra ninguno
    );
    console.log('Datos actualizados en MongoDB para el cliente', clientId);
    client.close();
  } catch (error) {
    console.error('Error al actualizar datos en MongoDB:', error);
  }
}