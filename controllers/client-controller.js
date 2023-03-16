import { clientServices

} from "../service/client-service";
clientServices.clientsList().then((data) => {
    data.forEach(({ email, password, id }) => {
       /*  if(){

        }
         */
    });
}).catch((error) => console.error("Ocurrio un error", error));