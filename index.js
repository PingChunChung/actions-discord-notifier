const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

const ctx = github.context
const { owner, repo } = ctx.repo
const repoURL = `https://github.com/${owner}/${repo}`
const { eventName, sha, ref, workflow, actor, payload } = ctx
const branch = ref.split('/').pop()
const validSHA = ctx.payload.pull_request?.head?.sha || sha
const workflowURL = `${repoURL}/commit/${validSHA}/checks`

try {
    const webhook = core.getInput('webhook')
    const status = core.getInput('status')
    const title = core.getInput('title')

    const embed = {
        title: `${status[0].toUpperCase()+status.substring(1)}: ${title}`,
        description: `${actor} - ${eventName}`,
        timestamp: new Date().toISOString(),
        color: status === 'success' ? 0x00BB00 : 0xEA0000, // 顏色 (16進位格式)
        fields: [
            {
                name: 'Repository',
                value: `[${owner}/${repo}](${repoURL})`,
                inline: true
            },
            {
                name: 'Branch',
                value: branch,
                inline: true
            },
            {
                name: 'Commit',
                value: `${payload.head_commit.message}`,
                inline: false
            },
            {
                name: 'Workflow',
                value: `[${workflow}](${workflowURL})`,
                inline: true
            }
        ],
    };

    // 訊息內容
    const message = {
        embeds: [embed]
    };

    axios.post(webhook, message)
        .then(function (response) {
            console.log('Message pushed to Discord!');
        })
        .catch(function (error) {
            console.error('Error from pushed message to Discord:', error);
            core.setFailed(error.message);
        });
} catch (error) {
    core.setFailed(error.message);
}