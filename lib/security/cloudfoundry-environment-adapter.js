'use strict'

if (process.env.NODE_ENV  === 'mock-e2e-cf-actuator') {
    const fs = require('fs')
    const resolve = require('path').resolve
    const env = fs.readFileSync(resolve('test/spec/security/vcap_application.json'), { encoding: 'utf-8'})
    process.env.VCAP_APPLICATION = env
}

/**
 * 
 */
class CloudFoundryEnvironmentAdapter {

    constructor() {
        this._vcap_application = JSON.parse(process.env.VCAP_APPLICATION || '{}')
    }

    /**
     * 
     * @returns {String} the unique id of the current application
     */
    getApplicationId() {
        return this._vcap_application.application_id
    }

    /**
     * 
     * @returns {String} the url of the cloudfoundry cloud controller
     */
    getCloudControllerUrl() {
        return this._vcap_application.cf_api
    }

    /**
     * 
     * @returns {String} the url of the info endpoint of the cloud controller
     */
    getCloudControllerInfoUrl() {
        return [
            this.getCloudControllerUrl(),
            'info'
        ].join('/')
    }

    /**
     * 
     * @returns {String} the url of th permissions endpoint of the cloud controller
     */
    getPermissionsUrl() {
        return [
            this.getCloudControllerUrl(),
            'v2',
            'apps',
            this.getApplicationId(),
            'permissions'
        ].join('/')
    }
}

module.exports = new CloudFoundryEnvironmentAdapter()