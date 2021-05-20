#!/usr/bin/env bash
yarn expo publish --quiet --release-channel stores --non-interactive

# iOS
yarn expo bi --skip-workflow-check --type archive --release-channel stores --skip-credentials-check > buildout_ios.txt && curl --output ./build/Counter.ipa --url $(grep -o "https://expo.io/artifacts/.*" buildout_ios.txt) -L && bundle exec fastlane release
rm buildout_ios.txt

# Android - Requires manual upload (I don't want to deal with the JSON key currently)
yarn expo ba --skip-workflow-check --no-publish --type apk --release-channel stores > buildout.txt && curl --output ./build/Counter.apk --url $(grep -o "https://expo.io/artifacts/.*" buildout.txt) -L
rm buildout_android.txt
