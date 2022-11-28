import './modalCustomer.css'
import { FiX } from 'react-icons/fi'

export default function ModalCustomer({ conteudo, close }) {
    return (
        <div className='modalCust'>
            <div className='container'>
                <button className='closed' onClick={close}>
                    <FiX size={23} color="#FFF" />
                </button>

                <div>
                    <h2>Detalhes do cliente</h2>

                    <div className="rows">
                        <span>
                            Name: <i>{conteudo.name}</i>
                        </span>
                    </div>

                    <div className="rows">
                        <span>
                            cpfcnpj: <i>{conteudo.cpfcnpj}</i>
                        </span>
                        {/* <span>
                            Cadastrado em: <a>{conteudo.createdFormated}</a>
                        </span> */}
                    </div>


                    <hr />
                    {conteudo.descricao !== '' && (
                        <>
                            <h3>Descricao</h3>
                            <p>
                                {conteudo.descricao}
                            </p>
                        </>
                    )}

                </div>
            </div>
        </div>
    )
}