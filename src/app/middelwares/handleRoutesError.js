export default function (req, res) {

  let status;
  let errorTitle;
  let message;
  

  
  if (req.method === 'PUT') {
    status = 400;
    errorTitle = 'url syntax error';
    if (req.url.search('products') >= 0) {
      message = `method 'PUT' of route '/products' require product id in params`;
    } else if (req.url.search('categories') >= 0) {
      message = `method 'PUT' of route '/categories' require category id in params`;
    } else if (req.url.search('users') >= 0) {
      message = `method 'PUT' of route '/users' require user id in params`;
    } else {
      status = '';
    }
  } else if (req.method === 'DELETE') {
    status = 400;
    errorTitle = 'url syntax error';
    if (req.url.search('products') >= 0) {
      message = `method 'DELETE' of route '/products' require product id in params`;
    } else if (req.url.search('categories') >= 0) {
      message = `method 'DELETE' of route '/categories' require category id in params`;
    } else if (req.url.search('users') >= 0) {
      message = `method 'DELETE' of route '/users' require user id in params`;
    } else {
      status = '';
    }
  } 

  return res.status(status ? status : 404).json({
        error: errorTitle ? errorTitle : 'Not found',
        message: message ? message : 'route not found'
      })
  }
