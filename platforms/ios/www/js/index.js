/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
	console.log("Initializing Gappy...");
    },
    // Bind Event Listeners
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    // deviceready Event Handler
    onDeviceReady: function() {
    },
};

function addContact()
{
    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var contact = {
	'firstname': firstname,
        'lastname':  lastname
    };
    
    var contactList;
    if (localStorage.getItem('contact_list')) {
	contactList = JSON.parse(localStorage.getItem('contact_list'));
    }
    else
    {
	contactList = {};
    }

    contactList[contact.lastname] = contact;
    localStorage.setItem('contact_list', JSON.stringify(contactList));
    
};

function displayContacts()
{
    var list = localStorage.getItem('contact_list');
    document.getElementById('list').innerHTML = list;
};

function addTask()
{
    var image = document.getElementById("smallImage");
    var annotation = document.getElementById("annotation").value;
    var task = { 'image': image.src, 'annotation': annotation }

    var tasks;
    if (localStorage.getItem('tasks')) {
	tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    else
    {
	tasks = [];
    }

    tasks.push(task);
    console.log(JSON.stringify(task));
    console.log(JSON.stringify(tasks));
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

function listTasks()
{
    var list = localStorage.getItem('tasks');
    document.getElementById('tasks').innerHTML = taskSerializer(list);
};

function taskSerializer(_tasks)
{
    var html = "";
    var imgTagStart = '<img style="display:block;width:200px;height:120px;" id="smallImage" src="';
    var imgTagEnd = '" />';
    var buttonTag = '<button onclick="sendTask()">Send task as SMS</button> <br>';


    var tasks = JSON.parse(_tasks);
    for (var i=0; i<tasks.length; i++) {
	html += imgTagStart + tasks[i].image + imgTagEnd;
	html += "<p>" + tasks[i].annotation + "</p><br>";
	html += buttonTag;
    }
    console.log(html);
    return html;
};

function capturePhoto()
{
    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50 });

};

function onPhotoDataSuccess(imageData) {
    console.log("\n*************************************\n");

    // Uncomment to view the base64-encoded image data
    console.log(imageData);
    
    // Get image handle
    var smallImage = document.getElementById('smallImage');

    // Unhide image elements
    smallImage.style.display = 'block';

    // Show the captured photo
    // The in-line CSS rules are used to resize the image
    smallImage.src = imageData;
};

function onFail(message) {
    alert('Failed because: Iunno');
};