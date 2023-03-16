Actions Discord Notifier sends message to Discord using webhook.

# Usage
You can post status of Github Actions when completed to Discord.

1. Create a webhook on your Discord server's settings.
2. Add the webhook URL to secrets with the name of `DISCORD_WEBHOOK_URL`.

```
- uses: actions/checkout@v3
- name: Run Discord Notify action
  uses: PingChunChung/actions-discord-notifier
  with:
      webhook: ${{ secrets.DISCORD_WEBHOOK_URL }}
```

You can use these inputs
```
  status:
    Job status. Should be bound to job.status.   
    Default to success.  
    The embed color will be green when status is success and otherwise is red.
  title:
    String included in embed title.
```