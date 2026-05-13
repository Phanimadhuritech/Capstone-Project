Generate package.json

Create .env file

Create express app & assign port number

Connect to db

Define schemas and create Models

UserTypeSchema firstName lastName email(unique) password role profileImageUrl isUserActive

ArticleSchema author title category content comments isArticleActive

Implement APIs

Create common api for register, login and logout

Frontend
Dynamic, Responsive User Interfaces(UI== web page--->Browser)
                           HTML
              CSS(styles & Responsiveness)  , Bootstrap, TailwindCSS    
JavaScript
ReactJS/Angular/Vue/NextJS        
STORING FILES IN MERN APP
Client                              Backend
--------------------------------------------
JSON                                req.body(exp.json()->body parser )  ---> DB
Binary data(File)                   req.file ( multer ) ---> DB (X)

                                    3rd party cloud(AWS, Cloudinary)
                                        |
                                        CDN link of the file
                                        |
                                        Store in DB
Install cloudinary & multer npm install cloudinary multer
cloudinary.js
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({ cloud_name: process.env.CLOUD_NAME, api_key: process.env.API_KEY, api_secret: process.env.API_SECRET, });

export default cloudinary;

cloudinaryUpload.js
import cloudinary from "./cloudinary.js";

export const uploadToCloudinary = (buffer) => { return new Promise((resolve, reject) => { const stream = cloudinary.uploader.upload_stream({ folder: "blog_users" }, (err, result) => { if (err) return reject(err); resolve(result); }); stream.end(buffer); }); };

multer.js
import multer from "multer";

export const upload = multer({ storage: multer.memoryStorage(), //to avoid RAM overflow limits: { fileSize: 2 * 1024 * 1024, // 2MB }, //for security validation fileFilter: (req, file, cb) => { if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") { cb(null, true); } else { const err = new Error("Only JPG and PNG allowed"); err.status = 400; cb(err, false); } }, });



(12-03-2026)
    -ArticleSchema
       author
       title
       category
       content
       comments
       isArticleActive

6. implement APIs
   userAPI.js
   authorAPI.js
  adminAPi.js
7.create common api for register,login,logout

(13-03-2026)
never mix synchronous  and asynchynocu are different
delete object can work only on javascrip tobject but not on the document

// Notes:
1. Add `JWT_SECRET=your_strong_secret_key_min32_chars` to .env
2. npm start (or restart server)
3. Register first, then login, copy token for logout


(14-03-2026)

cross side scripting effect attack and 
csrf effect:cross side resource forgery: it runs/read the client side server.
XSS: cross side scripting 
CSRF {search and learn about them}


Dynamic responsive user interfaces
### Frontend 
 Dynamic,Responsive UserInterface(UI==web page----->Browser)  
                        |
                        |->HTML-is a markup language, to create basic user interface(web page)    which is like a skeleton.
                        |->CSS-is a style sheet language,applies styles for the html and responsiveness.Dynamic nature-provides latest data to user by refreshing.
                        |->JavaScript-makes the webpage dynamic 
                        |->ReactJs
                             |->technologies by javascript:-ReactJs/angular/Vue/NextJs,(for desktop application we use electron.js which is released by javascript).Angular is a web framework.
Modern Css Framewoks:-Bootstarp,TailwindCss.
For frontend we willbe using TailwindCSS,HTML,CSS,javascript and reactjs,nextjs,vue. 