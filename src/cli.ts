#!/usr/bin/env node
import { relative } from 'node:path'
import mri from 'mri'
import { cyan } from 'colorette'
import { downloadRepo } from './giget'

async function main () {
  const args = mri(process.argv.slice(2))

  const input = args._[0]
  const dir = args._[1]
  if (!input || args.help || args.h) {
    console.error('Usage: npx getgit@latest <input> [<dir>] [--force] [--force-clean] [--offline] [--prefer-offline]')
    process.exit(1)
  }

  const r = await downloadRepo(input, dir, {
    force: args.force,
    forceClean: args['force-clean'],
    offline: args.offline
  })
  console.log(`✨ Successfully cloned ${cyan(r.url)} to ${cyan(relative(process.cwd(), r.dir))}\n`)
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
