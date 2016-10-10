'use strict';

var mongoose = require('mongoose');
var passport = require('passport');
var authMw = require('../middlewares/auth');
var multer = require('multer');

var Product = mongoose.model('product');
var Brand = mongoose.model('brand');
var multerInstance = multer({ dest: 'upload/' });
var fs = require('fs');


module.exports = function(app) {
    app.all('/admin', authMw);
    app.all('/admin/*', authMw);

    app.post('/login', passport.authenticate('login', {
        failureRedirect: '/login',
        failureFlash: true
    }), function (req, res) {
        if (req.body.remember == 'on') {
            req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // Cookie expires after 30 days
        } else {
            req.session.cookie.expires = false; // Cookie expires at end of session
        }
        res.redirect('/admin' + req.body.hash);
    });

    app.get('/login', function (req, res) {
        res.render('admin_login.pug', {
            error: req.flash('error')
        });
    });

    app.get('/admin', function (req, res) {
        res.render('admin_index.pug', {
            user: req.user.username
        });
    });

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/login');
    });

    app.get('/', function(req, res) {
        res.sendFile('../public/index.html');
    });

    app.post('/admin/upload/product/image/', multerInstance.single('file'), function(req, res) {
        tryUploadFile('public/resources/images/products/', req, res);
    });

    app.post('/admin/upload/brand/image/', multerInstance.single('file'), function(req, res) {
        tryUploadFile('public/resources/images/brands/', req, res);
    });

    app.post('/admin/upload/article/image/', multerInstance.single('file'), function(req, res) {
        tryUploadFile('public/resources/images/articles/', req, res);
    });

    function tryUploadFile(targetPath, req, res) {
        function getImageName() {
            var name = req.file.originalname;
            var dotPos = name.lastIndexOf('.');
            return [name.slice(0, dotPos), suffix, name.slice(dotPos)].join('');
        }
        function getTargetPath() {
            return targetPath + getImageName();
        }
        var tmp_path = req.file.path;
        var imageName = getImageName(req.file.originalname);
        var suffix = '';

        if(!fs.existsSync(targetPath)) {
            fs.mkdirSync(targetPath);
        }
        while(fs.existsSync(getTargetPath())) {
            suffix = parseInt(suffix + 1);
        }

        var src = fs.createReadStream(tmp_path);
        var dest = fs.createWriteStream(getTargetPath());
        src.pipe(dest);
        src.on('end', function() {
            res.json({
                success: true,
                imageName: getImageName()
            });
        });
        src.on('error', function(err) {
            res.json({
                success: true,
                imageName: ''
            });
        });
    };
};