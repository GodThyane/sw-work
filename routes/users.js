var express = require('express');
var router = express.Router();

let user = {
  firstName:'',
  lastName:''
};


let response = {
  err: false,
  code: 200,
  message: ''
};

/* GET users listing. */
router.get('/', function(req, res, next) {
  response = {
    err: false,
    code: 200,
    message: ''
  };
  if(user.firstName === '' || user.lastName === '') {
    response = {
      err: true,
      code: 501,
      message: 'El usuario no ha sido creado'
    };
  } else {
    response = {
      err: false,
      code: 200,
      message: 'respuesta del usuario',
      response: user
    };
  }
  res.send(response);
});

router.post('/', function (req, res, next) {
  if(!req.body.firstName || !req.body.lastName) {
    response = {
      err: true,
      code: 502,
      message: 'El campo nombre y apellido son requeridos'
    };
  } else {
    if(user.firstName !== '' || user.lastName !== '') {
      response = {
        err: true,
        code: 503,
        message: 'El usuario ya fue creado previamente'
      };
    } else {
      user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName
      };
      response = {
        err: false,
        code: 200,
        message: 'Usuario creado',
        response: user
      };
    }
  }

  res.send(response);
});

router.put('/', function (req, res) {
  if(!req.body.firstName || !req.body.lastName) {
    response = {
      err: true,
      code: 502,
      message: 'El campo nombre y apellido son requeridos'
    };
  } else {
    if(user.firstName === '' || user.lastName === '') {
      response = {
        err: true,
        code: 501,
        message: 'El usuario no ha sido creado'
      };
    } else {
      user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName
      };
      response = {
        err: false,
        code: 200,
        message: 'Usuario actualizado',
        response: user
      };
    }
  }

  res.send(response);
});


router.delete('/', function (req, res) {
  if(user.firstName === '' || user.lastName === '') {
    response = {
      err: true,
      code: 501,
      message: 'El usuario no ha sido creado'
    };
  } else {
    response = {
      err: false,
      code: 200,
      message: 'Usuario eliminado'
    };
    user = {
      firstName: '',
      lastName: ''
    };
  }
  res.send(response);
});

router.use(function(req, res, next) {
  response = {
    err: true,
    code: 404,
    message: 'URL no encontrada'
  };
  res.status(404).send(response);
});

module.exports = router;
