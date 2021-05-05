#!/usr/bin/env bash
yarn expo bi --skip-workflow-check --type archive --release-channel stores --skip-credentials-check > buildout.txt
curl --output ./build/Counter.ipa --url $(grep -o https://expo.io/artifacts/.* buildout.txt) -L
fastlane release
rm buildout.txt
