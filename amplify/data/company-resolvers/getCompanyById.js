// import { util } from '@aws-appsync/utils';
// import * as ddb from '@aws-appsync/utils/dynamodb'

export function request(ctx){
  // console.log('ctx', ctx);
  return {
    operation: 'Scan'
    // key: util.dynamodb.toMapValues({ id: ctx.args.company_id })
  }
}

export function response(ctx) {
  return ctx.result
}