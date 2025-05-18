const { withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

const GRADLE_PROPERTY_KEY = 'org.gradle.jvmargs';
const GRADLE_PROPERTY_VALUE = '-Xmx2048m -Dfile.encoding=UTF-8';

function withGradleHeapFix(config) {
    return withDangerousMod(config, [
        'android',
        async (config) => {
            const gradlePropsPath = path.join(config.modRequest.projectRoot, 'android', 'gradle.properties');
            let contents = '';

            try {
                contents = fs.readFileSync(gradlePropsPath, 'utf8');
            } catch (err) {
                console.warn('[withGradleHeapFix] Could not read gradle.properties:', err);
                return config;
            }

            const regex = new RegExp(`^${GRADLE_PROPERTY_KEY}=.*$`, 'm');

            if (regex.test(contents)) {
                contents = contents.replace(regex, `${GRADLE_PROPERTY_KEY}=${GRADLE_PROPERTY_VALUE}`);
            } else {
                contents += `\n${GRADLE_PROPERTY_KEY}=${GRADLE_PROPERTY_VALUE}\n`;
            }

            try {
                fs.writeFileSync(gradlePropsPath, contents);
                console.log('[withGradleHeapFix] JVM heap size configured in gradle.properties ✅');
            } catch (err) {
                console.error('[withGradleHeapFix] Failed to write gradle.properties:', err);
            }

            return config;
        },
    ]);
}

module.exports = withGradleHeapFix;
