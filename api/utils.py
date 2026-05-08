from datetime import date


def get_future_date():
    today = date.today()

    months_in_a_year = 12

    minimum_amount_of_days_in_a_month = 28

    day = today.day % minimum_amount_of_days_in_a_month

    month_offset = 7

    month = ((today.month + month_offset - 1) % months_in_a_year) + 1

    year_offset = (today.month + month_offset - 1) // months_in_a_year

    year = today.year + year_offset

    return today.replace(day=day, month=month, year=year)
