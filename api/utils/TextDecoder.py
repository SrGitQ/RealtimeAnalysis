
def addSymbolHash(text:str) -> str:
    '''
        This will add a '#' if the text does not have it

        ## Parameters
        text: str

        ## Returns
        '#<text>'
    '''
    return f'#{text}' if '#' not in text else text
