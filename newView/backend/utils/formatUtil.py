def format_equation_with_powers(equation):
    # Regex para encontrar os padrões de potências (por exemplo, x^2, y^3, etc.)
    pattern = r'([a-zA-Z]+)\^(\d+)'

    def replace_power(match):
        base, exponent = match.groups()
        return f'{base}{exponent}'

    # Substitui as potências pelos formatos desejados (por exemplo, x^2 -> x²)
    formatted_equation = re.sub(pattern, replace_power, equation)

    return formatted_equation
