exports.httpHandler = {
    endpoints: [
        {
            method: 'POST',
            path: '/toggleBooleanSetting',
            scope: 'global',
            handle: function handle(ctx) {
                try {

                    ctx.response.code = 200;
                    ctx.globalStorage.extensionProperties.booleanSetting = !ctx.globalStorage.extensionProperties.booleanSetting;
                    ctx.response.json({ success: true, value: ctx.globalStorage.extensionProperties.booleanSetting });
                } catch (error) {
                    ctx.response.code = 500;
                    ctx.response.json({ error: error.message });
                }
            }
        }
    ]
};
