module.exports = function(config){
    config.set({
    basePath : '../',

    preprocessors: {
        "**/*.html": "ng-html2js" // Preprocessor
    },

    ngHtml2JsPreprocessor: {
        stripPrefix: 'app/',
        moduleName:'templates' //load this module in your tests
    },

    files : [
  '../main/app/libs/jquery/dist/jquery.js',
  '../main/app/libs/bootstrap/dist/js/bootstrap.js',
  '../main/app/libs/angular/angular.js',
  '../main/app/libs/angular-ui-router/release/angular-ui-router.js',
  '../main/app/libs/satellizer/dist/satellizer.js',
  '../main/app/libs/angular-resource/angular-resource.js',
  '../main/app/libs/sha256/index.js',
  '../main/app/libs/angular-sanitize/angular-sanitize.js',
  '../main/app/libs/angular-toastr/dist/angular-toastr.js',
  '../main/app/libs/angular-toastr/dist/angular-toastr.tpls.js',
  '../main/app/libs/ngstorage/ngStorage.js',
  '../main/app/libs/angular-ui-grid/ui-grid.js',
  '../main/app/libs/angular-animate/angular-animate.min.js',
  '../main/app/libs/angular-loading-bar/build/loading-bar.js',
  '../main/app/libs/ng-dialog/js/ngDialog.js',
  '../main/app/libs/angularUtils-pagination/dirPagination.js',
  '../main/app/libs/angular-mocks/angular-mocks.js',
  '../main/app/js/app.js',
  '../main/app/js/services.js',
  '../main/app/js/services/menu-popup.service.js',
  '../main/app/js/filters.js',
  '../main/app/js/directives.js',
  '../main/app/modules/core/coreModule.js',
  '../main/app/modules/core/js/controllers.js',
  '../main/app/modules/core/js/controllers/datainputmain.controller.js',
  '../main/app/modules/core/js/controllers/start.controller.js',
  '../main/app/modules/core/js/controllers/project.settings.controller.js',
  '../main/app/modules/core/moh/js/controllers.js',
  '../main/app/modules/core/moh/js/controllers/settings.controller.js',
  '../main/app/modules/core/moh/js/services.js',
  '../main/app/modules/core/js/services.js',
  '../main/app/modules/core/js/services/popup.service.js',
  '../main/app/modules/core/js/directives.js',
  '../main/app/modules/core/js/directives/eatclickif.directive.js',
  '../main/app/modules/core/js/filters.js',
  '../main/app/modules/core/js/components.js',
  '../main/app/modules/auth/authModule.js',
  '../main/app/modules/auth/js/controllers.js',
  '../main/app/modules/auth/js/controllers/activate.controller.js',
  '../main/app/modules/auth/js/controllers/request-recovery.controller.js',
  '../main/app/modules/auth/js/controllers/recover.controller.js',
  '../main/app/modules/auth/js/services.js',
  '../main/app/modules/auth/js/services/auth.service.js',
  '../main/app/modules/core/standard/coreStandard.js',
  '../main/app/modules/core/standard/js/controllers.js',
  '../main/app/modules/core/standard/js/controllers/settings.controller.js',
  '../main/app/modules/core/standard/js/controllers/new-product.controller.js',
  '../main/app/modules/core/standard/js/controllers/property-wip-beginning.controller.js',
  '../main/app/modules/core/standard/js/controllers/property-wip-ending.controller.js',
  '../main/app/modules/core/standard/js/services.js',
  '../main/app/modules/core/standard/js/components.js',
  '../main/app/modules/dashboard/dashboardModule.js',
  '../main/app/modules/dashboard/controllers/controllers.js',
  '../main/app/modules/dashboard/controllers/home.controller.js',
  '../main/app/modules/dashboard/controllers/projects.controller.js',
  '../main/app/modules/dashboard/controllers/settings.controller.js',
  '../main/app/modules/dashboard/controllers/billing.controller.js',
  '../main/app/modules/dashboard/services/services.js',
  '../main/app/modules/terms/termsModule.js',
  '../main/app/modules/about/aboutModule.js',
  '../main/app/modules/about/js/services/menu-list.service.js',
  '../main/app/modules/about/js/controllers/home.controller.js',
  '../main/app/modules/manual/manualModule.js',
  '../main/app/modules/manual/js/services/menu-list.service.js',
  '../main/app/modules/manual/js/controllers/home.controller.js',
  '../main/app/modules/manual/js/controllers/standard-costing.controller.js',
  'unit/**/*.js',
  '../main/*.html',
  '../main/app/views/*.html',
  '../main/app/modules/**/*.html' // Here are your templates.
    ],

    exclude : [
      '../main/app/libs/angular/angular-loader.js',
      '../main/app/libs/angular/*.min.js',
      '../main/app/libs/angular/angular-scenario.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Firefox'],

    plugins : [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-ng-html2js-preprocessor'
            ],

    junitReporter : {
      outputFile: 'out/unit.xml',
      suite: 'unit'
    }

})}