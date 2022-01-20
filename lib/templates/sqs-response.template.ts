/**
 * we don't want to send all of the information from SQS back to the callee 
 * so we extract the key pieces of information needed to track the message.
 */ 
export const sqsResponseTemplate: string = `
    #set($inputRoot = $input.path('$'))
    #set($sndMsgResp = $inputRoot.SendMessageResponse)
    #set($metadata = $sndMsgResp.ResponseMetadata)
    #set($sndMsgRes = $sndMsgResp.SendMessageResult)
    {
        "RequestId" : "$metadata.RequestId",
        "MessageId" : "$sndMsgRes.MessageId"
    }
`;