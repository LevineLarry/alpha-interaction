var context = {}

const connect = async () => {
    context = {}

    context.port = await navigator.serial.requestPort()
    await context.port.open({baudRate: 115200, bufferSize: 10000 + (Math.random() * 1000)})
    
    context.textEncoder = new TextEncoderStream();
    context.writableStreamClosed = context.textEncoder.readable.pipeTo(context.port.writable);
    context.writer = context.textEncoder.writable.getWriter();
    context.textDecoder = new TextDecoderStream()
    context.readableStreamClosed = context.port.readable.pipeTo(context.textDecoder.writable)
    context.reader = context.textDecoder.readable.getReader()
}

const getFlightData = async () => {
    await context.writer.write("!flightData\r\n");
    var textStream, done
    while(!done) {
      let {value, done} = await context.reader.read()
      textStream += value
      if(value.includes("!end")) break
    }
    context.reader.releaseLock()

    textStream = textStream.replace("!end", "")
    textStream = textStream.replace('\r', "")
    textStream = textStream.replace('\n', "")
    textStream = textStream.split("!flightData")[1] 

    let temp = []
    let tempAcc = []
    let tempG = []
    let tempAlt = []
    let startingAlt
    textStream.split("\r\n").forEach(row => {
      let rowItems = row.split(",")
      let invalid = false

      if(rowItems[0] == 0 && rowItems[1] == 0 && rowItems[2] == 0 && rowItems[3] == 0) invalid = true

      for(let datum of rowItems) {
        if(typeof(datum) == "undefined" || datum == "") invalid = true
      }

      if(!invalid) {
        if(parseFloat(rowItems[3]) == 0) startingAlt = parseFloat(rowItems[2])

        temp.push({
          g: parseFloat(rowItems[0]),
          a: parseFloat(rowItems[1]),
          alt: parseFloat(rowItems[2]) - startingAlt,
          ts: parseFloat(rowItems[3]) / 1000
        })
      }
    })

    return temp
}

module.exports.getData = async () => {
    await connect()
    let data = await getFlightData()
    return data
}