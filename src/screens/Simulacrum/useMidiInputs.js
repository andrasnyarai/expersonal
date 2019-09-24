
import { useEffect, useState } from 'react'

const useMidiInputs = () => {
    const [midiInputs, setMidiInputs] = useState({})

    const set = (e) => {
      if (!e.data) return

      const data = e.data;

      const [,type,velocity] = data

      console.log(type)
      setMidiInputs(inputs => ({ ...inputs, [type]: velocity }))
    }

    async function accessMidiInputs () {
        const access = await navigator.requestMIDIAccess()
        const inputs = access.inputs.values()


        for (let input of inputs) {
            input.onmidimessage = set
        }
    }

    useEffect(() => {
        accessMidiInputs();
    }, [])

    return midiInputs
}

export default useMidiInputs
