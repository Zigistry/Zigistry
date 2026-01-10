export const prerender = true;
import res from '../../database.json';

export const entries = async () => {
    const out = [];

    for (const [name, program] of Object.entries(res.programs)) {
        const iter = name.split('/');
        const provider = iter[0] === 'gh' ? 'github' : 'codeberg';
        out.push(
            `/programs/${provider}/${iter[1]}/${iter[2]}`
        );
        for (const [version_name, version] of Object.entries(program.r)) {
            out.push(
                `/programs/${provider}/${iter[1]}/${iter[2]}/versions/${version_name}`
            );
        }
    }

    return out;
};
