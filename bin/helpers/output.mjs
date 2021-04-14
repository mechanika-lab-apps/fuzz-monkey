import chalk from 'chalk';
import numeral from 'numeral';
import capitalise from 'capitalize';
import pluralise from 'pluralize';

export const highlight =
    chalk.level > 1 ? chalk.hex('#ffd2e8') : chalk.magentaBright;

export function error(message) {
    const color = chalk.level > 1 ? chalk.hex('#ff6666') : chalk.redBright;

    console.log(
        '\n',
        color.italic.underline('Error'),
        chalk.gray('•'),
        chalk.whiteBright(message),
        '\n'
    );
}

export function info(current, total) {
    const total_ = numeral(total).format('0,0');

    return (type, ...message) => {
        console.log(
            chalk.gray('•'),
            chalk.whiteBright(
                numeral(current).format('0,0').padEnd(String(total_).length)
            ),
            chalk.gray(`(of ${total_})`),
            chalk.gray('•'),
            highlight.bold(capitalise(type).padEnd(10)),
            chalk.gray('•'),
            ...message
        );
    };
}

export function summary(config, errors) {
    const color = errors === 0 ? chalk.greenBright : chalk.redBright;

    console.log(
        `\n${color('•')}`,
        chalk.gray('Finished running'),
        chalk.whiteBright(numeral(config.iterations).format('0,0')),
        chalk.gray(
            `${pluralise('action', config.iterations)} which resulted in`
        ),
        chalk.whiteBright(numeral(errors).format('0,0')),
        chalk.gray(`${pluralise('error', errors)}.`),
        chalk.gray(`\n  Re-run using:`),
        chalk.white(`fuzzmonkey --template ${config.report}/history.json\n`)
    );
}
