# InterMine Translate PathQuery

An online editor to live translate XML <-> JSON versions of InterMine PathQueries.

![image](https://github.com/radekstepan/intermine-translate-pathquery/raw/master/example.png)

## Getting started

```bash
$ npm install -d
$ npm start
```

## Redhat OpenShift:

Create an account at [http://openshift.redhat.com](http://openshift.redhat.com) specifying a Node.js 0.6 "Web Cartridge" specifying the url for the app.

Install the OpenShift [client tools](https://openshift.redhat.com/app/getting_started).

Add your public key from `~/.ssh/id_rsa.pub` to your account. You can use xclip to copy the key to the clipboard:

```bash
$ xclip -sel clip < ~/.ssh/id_rsa.pub
```

Add the remote repository, like:

```bash
$ git remote add openshift ssh://[username_hash]@pathquery-intermine.rhcloud.com/~/git/pathquery.git/
```

Push your changes:

```bash
$ git push -u openshift master
```

### Debugging

In case of trouble, use the OpenShift client tools to debug:

```bash
$ /var/lib/gems/1.8/bin/rhc domain status
```

To determine the status of the app, run:

```bash
$ /var/lib/gems/1.8/bin/rhc-app status -a accordb
```

You can also SFTP into your instance on port `22` [sftp://accordb-intermine.rhcloud.com](sftp://accordb-intermine.rhcloud.com) or SSH to it.