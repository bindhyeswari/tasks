function Router() {
    this.views = {
        '/create_task': {
            trigger: document.getElementById('a_create_task'),
            element: document.getElementById('create_task_container')
        },
        '/show_task': {
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
        // show current view
        self.views[path].element.style.display = 'block';
    };

    for ( var view in self.views ) {
        self.views[view].trigger.addEventListener('click', function (event) {
            event.preventDefault();
            self.show(view);
        });
    }

}

var router = new Router();
console.log(router.views);







