import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

const VITE_APPWRITE_URL = "https://cloud.appwrite.io/v1"
const VITE_APPWRITE_PROJECT_ID = "65a801b15c02044e1987"
const VITE_APPWRITE_DATABASE_ID = "65a802e9979396fe60b2"
const VITE_APPWRITE_COLLECTION_ID = "65a8034393b7e62da3b0"
const VITE_APPWRITE_BUCKET_ID= "65a8066fb3dc6546bce0"

export class Service{
    client = new Client();
    databases;
    bucket;
    constructor(){
        this.client
        .setEndpoint(VITE_APPWRITE_URL)
        .setProject(VITE_APPWRITE_PROJECT_ID);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId, type}){
        try {
            return await this.databases.createDocument(
                VITE_APPWRITE_DATABASE_ID,
                VITE_APPWRITE_COLLECTION_ID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                    type
                }
            )
        } catch (error) {
            alert(error.message);
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                VITE_APPWRITE_DATABASE_ID,
                VITE_APPWRITE_COLLECTION_ID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,

                }
            )
        } catch (error) {
            alert(error.message);
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                VITE_APPWRITE_DATABASE_ID,
                VITE_APPWRITE_COLLECTION_ID,
                slug
            
            )
            return true
        } catch (error) {
            alert(error.message);
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                VITE_APPWRITE_DATABASE_ID,
                VITE_APPWRITE_COLLECTION_ID,
                slug
            )
        } catch (error) {
            alert(error.message);
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                VITE_APPWRITE_DATABASE_ID,
                VITE_APPWRITE_COLLECTION_ID,
                queries,
            )
        } catch (error) {
            alert(error.message);
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    //! file upload services......

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                VITE_APPWRITE_BUCKET_ID,
                ID.unique(),
                file
            )
        } catch (error) {
            alert(error.message);
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }
      
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                VITE_APPWRITE_BUCKET_ID,
                fileId
            )
            return true
        } catch (error) {
            alert(error.message);
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            VITE_APPWRITE_BUCKET_ID,
            fileId
        )
    }
}


const service = new Service()
export default service