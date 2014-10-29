function Router() {
    this.views = {
        '/create_task': {
            trigger: document.getElementById('a_create_task'),
            element: document.getElementById('create_task_container')
        },
        '/show_tasks': {
            trigger: document.getElementById('a_show_tasks'),
            element: document.getElementById('show_tasks_container')
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
        self.views[view].trigger.addEventListener('click', function (event) {
            event.preventDefault();
            console.log(/\/#(\/.+)/gmi.exec(this.href));
            self.show(/\/#(\/.+)/gmi.exec(this.href)[1]);
        });
    }

}

var router = new Router();
console.log(router.views);







