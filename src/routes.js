const { addBooksHandle, getBooksHandle, getDetailBook, getDetailUpdateBook, getDeleteBook } = require("./handler")

const routes = [
    {
        method:"POST",
        path:"/books",
        handler:addBooksHandle
    },
    {
        method: "GET",
        path:"/books",
        handler:getBooksHandle
    },{
        method:"GET",
        path:"/books/{id}",
        handler:getDetailBook
    },{
       method: "PUT",
       path:"/books/{id}",
       handler:getDetailUpdateBook 
    },{
        method:"DELETE",
        path:"/books/{id}",
        handler:getDeleteBook
    }
]

module.exports = routes