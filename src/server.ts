import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {


  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());


  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1. validate the image_url query
  app.get("/filterdimage", (req, res)=> {

    let { image_url } = req.query

    if(!image_url){
      return res.status(400).send("Invalid request .image_url is requires")
    }

    const filterData = filterImageFromURL(image_url)
    .then((filterResult) => {

      if(filterResult)
      {
        console.log("Success. >> result: " + filterResult);
      }
      console.log("3. send the resulting file in the response");
      //3. send the resulting file in the response
      res.sendFile(filterResult, function(){
        console.log("4. deletes any files on the server on finish of the response");
        //4. deletes any files on the server on finish of the response
        deleteLocalFiles([filterResult]);
      });
    })
    .catch(error => { console.log('Error caught', error.message); }); ;

  })

  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user

 

  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();