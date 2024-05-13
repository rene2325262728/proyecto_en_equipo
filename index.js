const express=require('express');
const mysql=require('mysql');
const bodyParser=require('body-parser');
const cors=require('cors');
const axios = require('axios');



const servidor=express();

servidor.use(cors({
    origin:'*',
    methods:'HEAD,GET,PUT,DELETE,POST,PATHC',
}));

servidor.use(bodyParser.urlencoded({extend:false}));
servidor.use(bodyParser.json());

const confibd={
    host:'localhost',
    user:'root',
    password:'',
    database:'hospital'
};

const poolconexion=mysql.createPool(confibd);
servidor.get('/map', (req, res) => {
    const { cp, lvl } = req.query;
    res.redirect(`https://www.bing.com/maps/?cp=${cp}&lvl=${lvl}`);
  });


const sendWhatsAppMessage = async (recipient,message) => {
    const url = `https://wa.me/${recipient}?text=${encodeURIComponent(message)}`;
    await axios.get(url);
}


servidor.post('/sendWhatsAppMessage', async (req, res) => {
    const { recipient, message } = req.body;
    try {
        await sendWhatsAppMessage(recipient, message);
        res.status(200).send('Mensaje enviado exitosamente');
    } catch (error) {
        res.status(500).send('Error al enviarlo');
    }
});
//video de youtube


  const videoIds = ['1HlD9hlvYMM?si=Bs1b5vsfuBZOPNLZ', 'jiCU7rgLOkY?si=8fD51ipYj-zySHrC', 'E2l0_lab-wk?si=TLat7M7VI9HqctQm'];

  servidor.get('/videos', (req, res) => {
    // Select a random video ID from the array
    const randomVideoId = videoIds[Math.floor(Math.random() * videoIds.length)];
  
    res.send(`
      <html>
        <body>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/${randomVideoId}?si=JfWZS-sj0ajAamOe" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </body>
      </html>
    `);
  });


//actualizar datos de medico
servidor.put("/medico",(req,res)=>{
    let id=req.body.id;
    let nombre=req.body.nombre;
    let apellido=req.body.apellido;
    let especialidad=req.body.especialidad;
    let telefono=req.body.telefono;
    let clave=req.body.clave;

poolconexion.query("update medico set nombre='"+nombre+"',apellido='"+apellido+"',especialidad='"+especialidad+"',numero='"+telefono+"',clave='"+clave+"' where id=" + id,(err,result)=>{
if(err) throw console.log("error en edicion de datos");

});

});


//eliminacion de datos de medico 
servidor.delete("/medico",(req,res)=>{
    let id=req.body.id;
poolconexion.query("delete from medico where id=" + id,(err,restul)=>{
    if(err) throw "error en eliminacion";
});

});



//consulta de medico 
servidor.get("/medico/:id",(req,res)=>{
    let id=req.params.id;
    let sentencia="select * from medico  where id=" + id;
    poolconexion.query(sentencia,(err,result)=>{
        if(err) throw console.log("error mysql");
        res.json(result);
    });


});


//extraccion de medico 
servidor.get("/medico",(req,res)=>{
let sentencia="select * from medico";
poolconexion.query(sentencia,(err,result)=>{
    if(err) throw console.log("error mysql");
    res.json(result);
});
});


//guardar tabla medicos
servidor.post("/medico",(req,res)=>{
let nombre=req.body.nombre;
let apellido=req.body.apellido;
let especialidad=req.body.especialidad;
let telefono=req.body.telefono;
let clave=req.body.clave;
let sql=`insert into medicos(nombre,apellido,especialidad,telefono,clave) values('${nombre}','${apellido}','${especialidad}','${telefono}','${clave}')`;
poolconexion.query(sql,(error,result)=>{
    if(error) throw console.log("error de guardado");
    res.send({mensaje:'ok'});
});





});
//todo lo relacionado con el paciente 
//actualizar datos  del paciente 
servidor.put("/paciente",(req,res)=>{
    let id=req.body.id;
    let nombre=req.body.nombre;
    let apellido=req.body.apellido;
    let fecha_de_nacimiento=req.body.fecha_de_nacimiento;
    let direccion=req.body.direccion;
    let telefono=req.body.telefono;
    let clave=req.body.clave;

poolconexion.query("update paciente set nombre='"+nombre+"',apellido='"+apellido+"',fecha_de_nacimiento='"+fecha_de_nacimiento+"',direccion='"+direccion+"',telefono='"+telefono+"',clave='"+clave+"' where id=" + id,(err,result)=>{
if(err) throw console.log("error en edicion de datos");

});

});


//eliminacion de datos de medico 
servidor.delete("/paciente",(req,res)=>{
    let id=req.body.id;
poolconexion.query("delete from paciente where id=" + id,(err,restul)=>{
    if(err) throw "error en eliminacion";
});

});



//consulta de medico 
servidor.get("/paciente/:id",(req,res)=>{
    let id=req.params.id;
    let sentencia="select * from paciente  where id=" + id;
    poolconexion.query(sentencia,(err,result)=>{
        if(err) throw console.log("error mysql");
        res.json(result);
    });


});


//extraccion de paciente 
servidor.get("/paciente",(req,res)=>{
let sentencia="select * from paciente";
poolconexion.query(sentencia,(err,result)=>{
    if(err) throw console.log("error mysql");
    res.json(result);
});
});


//guardar tabla paciente
servidor.post("/paciente",(req,res)=>{
    let nombre=req.body.nombre;
    let apellido=req.body.apellido;
    let fecha_de_nacimiento=req.body.fecha_de_nacimiento;
    let direccion=req.body.direccion;
    let telefono=req.body.telefono;
    let clave=req.body.clave;


let sql=`insert into paciente(nombre,apellido,fecha _de_nacimiento,direccion,telefono) values('${nombre}','${apellido}','${fecha_de_nacimiento}','${direccion}','${telefono}','${clave}')`;
poolconexion.query(sql,(error,result)=>{
    if(error) throw console.log("error de guardado");
    res.send({mensaje:'ok'});
});

});
//todo relacionado con lo que es departamento 

//actualizar datos  del departamento
servidor.put("/departamento",(req,res)=>{
    let id=req.body.id;
    let nombre_del_departamento=req.body.nombre_del_departamento;
    let ubicacion=req.body.ubicacion;
  
poolconexion.query("update departamento set nombre_del_departamento='"+nombre_del_departamento+"',apellido='"+ubicacion+"' where id=" + id,(err,result)=>{
if(err) throw console.log("error en edicion de datos");

});

});


//eliminacion del departamento
servidor.delete("/departamento",(req,res)=>{
    let id=req.body.id;
poolconexion.query("delete from departamento  where id=" + id,(err,restul)=>{
    if(err) throw "error en eliminacion";
});

});



//consulta de departamento
servidor.get("/departamento/:id",(req,res)=>{
    let id=req.params.id;
    let sentencia="select * from departamento  where id=" + id;
    poolconexion.query(sentencia,(err,result)=>{
        if(err) throw console.log("error mysql");
        res.json(result);
    });


});


//extraccion de departamento 
servidor.get("/departamento",(req,res)=>{
let sentencia="select * from departamento";
poolconexion.query(sentencia,(err,result)=>{
    if(err) throw console.log("error mysql");
    res.json(result);
});
});


//guardar tabla de departamento
servidor.post("/departamento",(req,res)=>{
    let nombre_del_departamento=req.body.nombre_del_departamento;
    let ubicacion=req.body.ubicacion;
let sql=`insert into departamento(nombre_del_paciente,ubicacion) values('${nombre_del_departamento}','${ubicacion}')`;
poolconexion.query(sql,(error,result)=>{
    if(error) throw console.log("error de guardado");
    res.send({mensaje:'ok'});
});

});
// todo lo relacionado con la habitacion

//actualizar datos  del habitacion
servidor.put("/habitacion",(req,res)=>{
    let id=req.body.id;
    let tipo=req.body.tipo;
    let disponibilidad=req.body.disponibilidad;
  
poolconexion.query("update habitacion set tipo='"+tipo+"',disponibilidad='"+disponibilidad+"' where id=" + id,(err,result)=>{
if(err) throw console.log("error en edicion de datos");

});

});


//eliminacion de la habitacion
servidor.delete("/habitacion",(req,res)=>{
    let id=req.body.id;
poolconexion.query("delete from habitacion  where id=" + id,(err,restul)=>{
    if(err) throw "error en eliminacion";
});

});



//consulta de la habitacion 
servidor.get("/habitacion/:id",(req,res)=>{
    let id=req.params.id;
    let sentencia="select * from habitacion where id=" + id;
    poolconexion.query(sentencia,(err,result)=>{
        if(err) throw console.log("error mysql");
        res.json(result);
    });


});


//extraccion de habitacion 
servidor.get("/habitacion",(req,res)=>{
let sentencia="select * from habitacion";
poolconexion.query(sentencia,(err,result)=>{
    if(err) throw console.log("error mysql");
    res.json(result);
});
});


//guardar tabla de habitacion 
servidor.post("/habitacion",(req,res)=>{
    let tipo=req.body.tipo;
    let disponibilidad=req.body.disponibilidad;
let sql=`insert into habitacion(tipo,disponibilidad) values('${tipo}','${disponibilidad}')`;
poolconexion.query(sql,(error,result)=>{
    if(error) throw console.log("error de guardado");
    res.send({mensaje:'ok'});
});

});



// todo lo relacionado con consulta 

//actualizar datos de consulta
servidor.put("/consulta",(req,res)=>{
    let id=req.body.id;
    let fecha=req.body.fecha;
    let hora=req.body.hora;
    let id_medico=req.body.id_medico;
    let id_paciente=req.body.id_paciente;

poolconexion.query("update consulta set fecha='"+fecha+"',hora='"+hora+"',id_medico='"+id_medico+"',id_paciente='"+id_paciente+"' where id=" + id,(err,result)=>{
if(err) throw console.log("error en edicion de datos");

});

});


//eliminacion de la consulta
servidor.delete("/consulta",(req,res)=>{
    let id=req.body.id;
poolconexion.query("delete from consulta  where id=" + id,(err,restul)=>{
    if(err) throw "error en eliminacion";
});

});



//consulta de la consulta
servidor.get("/consulta/:id",(req,res)=>{
    let id=req.params.id;
    let sentencia="select * from consulta where id=" + id;
    poolconexion.query(sentencia,(err,result)=>{
        if(err) throw console.log("error mysql");
        res.json(result);
    });


});


//extraccion de consulta
servidor.get("/consulta",(req,res)=>{
let sentencia="select * from consulta";
poolconexion.query(sentencia,(err,result)=>{
    if(err) throw console.log("error mysql");
    res.json(result);
});
});


//guardar tabla consulta
servidor.post("/consulta",(req,res)=>{
    let fecha=req.body.fecha;
    let hora=req.body.hora;
    let id_medico=req.body.id_medico;
    let id_paciente=req.body.id_paciente;

let sql=`insert into consulta(fecha,hora,id_medico,id_paciente) values('${fecha}','${hora}','${id_medico}','${id_paciente}')`;
poolconexion.query(sql,(error,result)=>{
    if(error) throw console.log("error de guardado");
    res.send({mensaje:'ok'});
});

});
//todo lo relacionado con tratamiento 
//actualizar datos de tratamiento
servidor.put("/tratamiento",(req,res)=>{
    let id=req.body.id;
    let descripcion=req.body.descripcion;
    let costo=req.body.costo;
    
poolconexion.query("update tratamiento set descripcion='"+descripcion+"',tramiento='"+costo+"' where id=" + id,(err,result)=>{
if(err) throw console.log("error en edicion de datos");

});

});


//eliminacion del tratamiento 
servidor.delete("/tratamiento",(req,res)=>{
    let id=req.body.id;
poolconexion.query("delete from tratamiento  where id=" + id,(err,restul)=>{
    if(err) throw "error en eliminacion";
});

});



//consulta del tratamiento
servidor.get("/tratameiento/:id",(req,res)=>{
    let id=req.params.id;
    let sentencia="select * tratamiento from co where id=" + id;
    poolconexion.query(sentencia,(err,result)=>{
        if(err) throw console.log("error mysql");
        res.json(result);
    });


});


//extraccion de tratamiento
servidor.get("/tramiento",(req,res)=>{
let sentencia="select * from tratamiento";
poolconexion.query(sentencia,(err,result)=>{
    if(err) throw console.log("error mysql");
    res.json(result);
});
});


//guardar tabla tratamiento
servidor.post("/tratamiento",(req,res)=>{
    let descripcion=req.body.descripcion;
    let costo=req.body.costo;
    

let sql=`insert into tratamiento(descripcion,costo) values('${descripcion}','${costo}')`;
poolconexion.query(sql,(error,result)=>{
    if(error) throw console.log("error de guardado");
    res.send({mensaje:'ok'});
});

});


// todo sobre la historia medica 
//actualizar la historia medica 
servidor.put("/historia_medica",(req,res)=>{
    let id=req.body.id;
    let id_paciente=req.body.id_paciente;
    let id_medico=req.body.id_medico;
    let diagnostico=req.body.diagnostico;
    let fecha=req.body.fecha;
    
poolconexion.query("update historia_medica set id_paciente='"+id_paciente+"',id_medico='"+id_medico+"',diagnostico='"+diagnostico+"',fecha='"+fecha+"' where id=" + id,(err,result)=>{
if(err) throw console.log("error en edicion de datos");

});

});


//eliminacion de historia medica 
servidor.delete("/historia_medica",(req,res)=>{
    let id=req.body.id;
poolconexion.query("delete from historia_medica  where id=" + id,(err,restul)=>{
    if(err) throw "error en eliminacion";
});

});



//consulta del historia medica
servidor.get("/historia_medica/:id",(req,res)=>{
    let id=req.params.id;
    let sentencia="select * historia_medica  from co where id=" + id;
    poolconexion.query(sentencia,(err,result)=>{
        if(err) throw console.log("error mysql");
        res.json(result);
    });


});


//extraccion de la historia medica 
servidor.get("/historia_medica",(req,res)=>{
let sentencia="select * from historia_medica";
poolconexion.query(sentencia,(err,result)=>{
    if(err) throw console.log("error mysql");
    res.json(result);
});
});


//guardar tabla historia medica 
servidor.post("/historia_medica",(req,res)=>{
    
    let id_paciente=req.body.id_paciente;
    let id_medico=req.body.id_medico;
    let diagnostico=req.body.diagnostico;
    let fecha=req.body.fecha;
let sql=`insert into historia_medica(id_paciente,id_medico,diagnostico,fecha) values('${id_paciente}','${id_medico}','${diagnostico}','${fecha}')`;
poolconexion.query(sql,(error,result)=>{
    if(error) throw console.log("error de guardado");
    res.send({mensaje:'ok'});
});

});

servidor.listen(3333,()=>{
    console.log("servidor en linea en el puesto 3333");
});
