import { PencilRuler } from 'lucide-react'
import { useState } from 'react'
import MarkdownRenderer from '../../components/utility/MarkdownRenderer'
import Modal from '../../components/utility/Modal'

export default function TextAssist() {
    const [open, setOpen] = useState(false)
    const [markdown, setMarkdown] = useState('Hey ***YOU***! Check **this** out!')

    const example1 = `
*This is Italic*

**This is Bold**

***This is Bold and Italic***
`

    const example2 = `
Blah Blah \`inline text blockt\` Blah

\`\`\`
name = input('Enter your name: ')
n = int(input('Enter a number: '))

for i in range(n):
    print(f'Hello {name}!')

\`\`\`
`

    const example3 = `
Inline equation: $A = B \\cdot C$

Block equation:
$$
v = \\frac{s}{t}
$$
`

    const example4 = `
$ A \\cdot B $

$A_{index}$

$A^{exponent}$

$\\frac{numerator}{denominator}$

$\\sin (x) \\cos (x) \\tan (x)$

$\\theta \\phi \\pi$

$\\le \\ge \\neq$
`

    return (
        <>
            <button className='btn' onClick={() => setOpen(true)}><PencilRuler />Text formatting guide</button>
            {open && (
                <Modal onClose={() => setOpen(false)} >
                    <main className='block vertical elements-top'>
                        <section>
                            <h2>Text formatting</h2>
                            Flashcards support markdown rendering. This means, you can use specific syntax to format your questions and answers or to put emphasis on specific word.
                            <h3>Example</h3>
                            <div className='block horizontal-priority g-2 h-elements-top mt'>
                                <div className='black'>
                                    *This is Italic* <br /><br /> **This is Bold** <br /><br /> ***This is Bold and Italic***
                                </div>
                                <div className='black md-output'>
                                    <MarkdownRenderer markdown={example1} />
                                </div>
                            </div>
                            <br /><br />It can also be used to render text blocks or code blocks.
                            <h3>Example</h3>
                            <div className='block horizontal-priority g-2 h-elements-top mt'>
                                <div className='black'>
                                    Blah Blah `inline text blockt` Blah <br /><br /> ``` <br /> name = input('Enter your name: ') <br /> n = int(input('Enter a number: ')) <br /> for i in range(n): <br />  &nbsp; &nbsp; &nbsp; &nbsp;print(f'Hello {'{name}'}!') <br /> ``` <br />
                                </div>
                                <div className='black md-output'>
                                    <MarkdownRenderer markdown={example2} />
                                </div>
                            </div>
                            <br /><br /> But most importanty, it can convert LaTeX notation and render math equations.
                            <h3>Example</h3>
                            <div className='block horizontal-priority g-2 h-elements-top mt'>
                                <div className='black'>
                                    Inline equation: $A = B \cdot C$ <br /> <br />  Block equation: <br /> $$ <br /> v = \frac{'{s}{t}'} <br /> $$
                                </div>
                                <div className='black md-output'>
                                    <MarkdownRenderer markdown={example3} />
                                </div>
                            </div>
                            <h3>Useful notations</h3>
                            <em>You can find more LaTeX notations online.</em>
                            <div className='block horizontal-priority g-2 h-elements-top mt'>
                                <div className='black'>
                                    A \cdot B <br /><br /> A_{'{index}'} <br /><br /> A^{'{exponent}'} <br /><br /> \frac{'{numerator}{denominator}'} <br /><br /> \sin (x) \cos (x) \tan (x) <br /><br /> \theta \phi \pi <br /><br /> {'\\le \\ge \\neq'}
                                </div>
                                <div className='black md-output'>
                                    <MarkdownRenderer markdown={example4} />
                                </div>
                            </div>
                            <h3>Try it out!</h3>
                            <div className='block horizontal-priority g-2 mt h-elements-top'>
                                <textarea
                                    maxLength={2000}
                                    value={markdown}
                                    onChange={(e) => setMarkdown(e.target.value)}
                                    className='input'
                                    rows={10}
                                />
                                <div className='black md-output md'>
                                    <MarkdownRenderer markdown={markdown} />
                                </div>
                            </div>
                        </section>
                        <button className="btn mt" onClick={() => { setOpen(false) }}>Cool!</button>
                    </main>
                </Modal>
            )}
        </>
    )
}
