import React, { Component } from 'react'
import Helmet from 'react-helmet'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'
import dateFnsFormat from 'date-fns/format'
import dateFnsParse from 'date-fns/parse'
import { DateUtils } from 'react-day-picker'

function parseDate(str, format, locale) {
  const parsed = dateFnsParse(str, format, { locale })
  if (DateUtils.isDate(parsed)) {
    return parsed
  }
  return undefined
}

function formatDate(date, format, locale) {
  return dateFnsFormat(date, format, { locale })
}

class Filter extends Component {
  state = {
    from: null,
    to: null,
    period: '',
    dateFormat: 'DD.MM.YYYY'
  }

  handleFromChange = (from) => {
    this.setState({ from: from })
  }

  handleToChange = (to) => {
    this.setState({ to: to })
  }

  parseDate = (str, format, locale) => {
    const parsed = dateFnsParse(str, format, { locale })
    if (DateUtils.isDate(parsed)) {
      return parsed
    }
    return undefined
  }

  formatDate = (date, format, locale) => {
    return dateFnsFormat(date, format, { locale })
  }

  get period() {
    const { from, to, dateFormat } = this.state
    return (
      (from === null ? '<не выбрано>' : formatDate(from, dateFormat)) +
      ' - ' +
      (to === null ? '<не выбрано>' : formatDate(to, dateFormat))
    )
  }

  render() {
    const { from, to, dateFormat } = this.state
    const modifiers = { start: from, end: to }
    return (
      <div className="InputFromTo">
        <p>Выберите диапазон дат:</p>
        <DayPickerInput
          value={from}
          placeholder="С"
          formatDate={formatDate}
          format={dateFormat}
          parseDate={parseDate}
          dayPickerProps={{
            selectedDays: [from, { from, to }],
            disabledDays: { after: to },
            toMonth: to,
            modifiers,
            numberOfMonths: 2,
            onDayClick: () => this.to.getInput().focus()
          }}
          onDayChange={this.handleFromChange}
        />{' '}
        —{' '}
        <span className="InputFromTo-to">
          <DayPickerInput
            ref={(el) => (this.to = el)}
            value={to}
            placeholder="По"
            formatDate={formatDate}
            format={dateFormat}
            parseDate={parseDate}
            dayPickerProps={{
              selectedDays: [from, { from, to }],
              disabledDays: { before: from },
              modifiers,
              month: from,
              fromMonth: from,
              numberOfMonths: 2
            }}
            onDayChange={this.handleToChange}
          />
        </span>
        {
          <Helmet>
            <style>
              {`
                .InputFromTo .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) { background-color: #f0f8ff !important; color: #4a90e2; }
                .InputFromTo .DayPicker-Day {border-radius: 0 !important;}
                .InputFromTo .DayPicker-Day--start {border-top-left-radius: 50% !important;border-bottom-left-radius: 50% !important;}
                .InputFromTo .DayPicker-Day--end {border-top-right-radius: 50% !important;border-bottom-right-radius: 50% !important;}
                .InputFromTo .DayPickerInput-Overlay {width: 550px;}
                .InputFromTo-to .DayPickerInput-Overlay {margin-left: -198px;}
              `}
            </style>
          </Helmet>
        }
        <p>Выбранный диапазон: {this.period}</p>
      </div>
    )
  }
}

export default Filter
