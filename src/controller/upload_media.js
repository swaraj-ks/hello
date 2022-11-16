'use strict';
// const db = require('../../bin/database');
var async = require('async');
const upload = require('../helper/uploder');

const moment = require('moment');
const output = require('../helper/api');
var fs = require('fs');
const path = require('path');

const dir = './storage'

class file_uploadController {

    videoUpload(req, res) {
        return new Promise(function (resolve, reject) {
            upload(req, res, function (err,data) {
                if (err !== null) return reject(output.invalid(req, res, err));
                resolve(output.ok(req, res, data, "uploaded", 0))
            });
        });
    }

    csvUpload(req, res) {
        return new Promise(function (resolve, reject) {
            upload(req, res,
                 function (err,data) {
                if (err !== null) reject(output.invalid(req, res, err));
                else {resolve(req.send(data))}
                  }
            );
        });
    }

    listOfvideo(req,res){
        fs.readdir(dir, (error, fileNames) => {
            if (error) output.invalid(req, res, error);
            else if(fileNames){
            fileNames.forEach(filename => {
              // get current file name
              const name = path.parse(filename).name;
              // get current file extension
              const ext = path.parse(filename).ext;
              // get current file path
              const filepath = path.resolve(dir, filename);
        
              // get information about the file
              fs.stat(filepath, function(error, stat) {
                if (error) throw error;
        
                // check if the current path is a file or a folder
                const isFile = stat.isFile();
        
                // exclude folders
                if (isFile) {
                  // callback, do something with the file
                  let data = {
                      "filepath":filepath,
                      "name":name,
                      "ext":ext,
                      "stat":stat
                  }
                  
                }
              });
            });
            output.ok(req, res, fileNames, "file list", 0)
        }else{
            // output.ok(req, res, [], "sub catagory", 0)
        }
        })
    }

    deleteFile(req,res){
        let path = dir+'/'+req.params.filename;
        fs.unlink(path, (err,data) => {
            if (err) output.invalid(req, res, err);
            else output.ok(req, res, [], "file deleted", 0)
          });
          
    }
}

module.exports =  new file_uploadController();
