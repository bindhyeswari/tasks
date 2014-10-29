function Router() {
    this.views = {
        '/create_task': {
            trigger: document.getElementById('a_create_task'),
            element: document.getElementById('create_task_container'),
            init: []
        },
        '/show_tasks': {
            trigger: document.getElementById('a_show_tasks'),
            element: document.getElementById('show_tasks_container'),
            init: []
        }
    };

    this.path = '/create_task';

    var self = this;

    this.show = function (path) {
        this.path = path;
        // hide all views
        for ( var view in self.views ) {
            self.views[view].element.style.display = 'none';
        }
        console.log(path);
        // show current view
        console.log(self.views[path]);
        self.views[path].element.style.display = 'block';
    };

    for ( var view in self.views ) {
        console.log(view);
        console.log(self.views[view]);
        self.views[view].element.style.display = 'none';
        self.views[view].trigger.addEventListener('click', function (event) {
            event.preventDefault();
            console.log(/\/#(\/.+)/gmi.exec(this.href));
            var path = /\/#(\/.+)/gmi.exec(this.href)[1];
            self.show(path);
            self.views[path].init.forEach(function (fn) {
                fn();
            });
        });
    }

}

var router = new Router();

router.views['/show_tasks'].init.push(function () {
    // get all the tasks from the backend and display it

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/tasks');
    xhr.addEventListener('readystatechange', function () {
        if ( xhr.status === 200 && xhr.readyState === 4 ) {
            var data = JSON.parse(xhr.responseText);
            console.log(data);
            for (var i = 0, len = data.length; i < len; i++) {
                document.getElementById('show_tasks_container').appendChild(createTaskDivElement(data[i]));
            }
        }
    });
    xhr.send();

});

console.log(router.views);

function createTaskDivElement(task) {
    var container = createElement('div', 'task', '');
    container.setAttribute('data-priority', task.priority);
    var selected = ['description', 'status', 'tags', 'notes'];
    for ( var i = 0; i < selected.length; i++ ) {
        var prop = selected[i];
        var row = createElement('div', 'task_row', '', container);
        createElement('span', 'data', task[prop], row);
        createElement('span', 'caption', prop, row);
    }
    return container;
}

function createElement(type, className, innerHTML, parent) {
    var element = document.createElement(type);
    element.className = className;
    element.innerHTML = innerHTML;
    if ( typeof parent !== 'undefined' ) parent.appendChild(element);
    return element;
}







