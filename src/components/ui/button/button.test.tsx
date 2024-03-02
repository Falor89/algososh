import renderer from 'react-test-renderer'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './button'

describe('Тестирование Button', () => {
    it('Кнопка с текстом рендерится без ошибки', () => {
        const buttonText = renderer
            .create(<Button text='Кнопка с текстом' />)
            .toJSON();
        expect(buttonText).toMatchSnapshot()
    })
    it('Кнопка без текста рендерится без ошибки', () => {
        const buttonWithoutText = renderer
            .create(<Button />)
            .toJSON()
        expect(buttonWithoutText).toMatchSnapshot()
    })
    it('Кнопка с текстом рендерится без ошибки', () => {
        const buttonText = renderer
            .create(<Button disabled />)
            .toJSON();
        expect(buttonText).toMatchSnapshot()
    })
    it('Кнопка без текста рендерится без ошибки', () => {
        const buttonWithoutText = renderer
            .create(<Button isLoader={true} />)
            .toJSON()
        expect(buttonWithoutText).toMatchSnapshot()
    })
    it('Проверяем корректность вызова колбека при клике на кнопку', () => {
        const onClick = jest.fn()
        render(<Button text='test' onClick={onClick} />)
        const button = screen.getByText('test')
        fireEvent.click(button)
        expect(onClick).toHaveBeenCalled()
    })
})